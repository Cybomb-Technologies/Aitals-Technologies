const getApiStatus = (req, res) => {
    // Send a success response with a friendly message
    res.json({
        message: 'Aitals Tech Company API is running smoothly!',
        status: 'OK',
        service: 'Aitals Backend Service'
    });
};

export { getApiStatus };