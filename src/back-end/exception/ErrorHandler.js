class ErrorHandler {
    errorHandler(err, req, res, next) {
        console.error(err);
        if (err.statusCode) {
            res.status(err.statusCode).json({ erro: err.message });
        } else {

            res.status(500).json({ erro: "Erro interno do servidor" });
        }
    }
}

export default new ErrorHandler();