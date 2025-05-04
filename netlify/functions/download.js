const { get } = require('@netlify/blobs');

exports.handler = async (event) => {
  try {
    const { blobId, fileName } = JSON.parse(event.body)
    const { body, metadata } = await get('uploads', blobId);

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        },
        body: JSON.stringify({
            is_success: true,
            payload: {
                base64Data: body.toString('base64'),
                contentType: metadata.contentType || 'application/octet-stream'
            }
        }),
        isBase64Encoded: true,
    }
  } catch (err) {
    return {
        statusCode: 404,
        body: JSON.stringify({ is_success: false, payload: "File not found" }),
    };
  }
};
