const { getStore } = require('@netlify/blobs');

async function blobToBase64(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

exports.handler = async (event) => {
    try {
        const { blobId, fileName } = JSON.parse(event.body)
        const store = await getStore({ name: "uploads", siteID: process.env.siteID, token: process.env.TOKEN })
        const { data, metadata } = await store.getWithMetadata(blobId, { type: 'blob' })
        await store.delete(blobId)

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_success: true,
                payload: {
                    base64Data: await blobToBase64(data),
                    contentType: metadata.contentType || 'application/octet-stream',
                    fileName: metadata.fileName || fileName,
                }
            })
        }
    } catch (err) {
        return {
            statusCode: 202,
            body: JSON.stringify({ 
                is_success: false, 
                payload: "File not found"
            }),
        };
    }
};
