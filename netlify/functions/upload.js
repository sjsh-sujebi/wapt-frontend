const { getStore } = require('@netlify/blobs')
const { v4: uuidv4 } = require('uuid')

exports.handler = async (event) => {
    const store = await getStore({ name: "uploads", siteID: process.env.siteID, token: process.env.TOKEN })
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const jsonBody = JSON.parse(event.body)
    const { fileName, contentType, base64File } = jsonBody
    
    const fileBuffer = Buffer.from(base64File, 'base64'); // Lambda sends body as base64
    const blobId = uuidv4()
    
    try {
        await store.set(blobId, fileBuffer, {
            metadata: { contentType, fileName },
        });
    
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                is_success: true,
                payload: {
                    blobId,
                    fileName
                }
            }),
        };
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                is_success: false,
                payload: "something went wrong"
            }),
        };
    }
};