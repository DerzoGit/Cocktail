const errorHandler = (err, req, res, next) => {
    console.log("On ErrorHanlder")
    console.log(err)
    
    return res.status(err.statusCode || 500).json({ message: err.message, error: err })
}

module.exports = errorHandler