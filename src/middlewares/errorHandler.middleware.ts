import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';

const errorHandlerMiddleWare = (error, req, res, next) => {
  if (
    error &&
    (error instanceof HttpException || error instanceof ValidationException)
  ) {
    return res.status(error.code || 400).json({
      error: {
        message: error.message || 'Something Went Wrong',
      },
    });
  }
  console.error(error);
  return res.status(500).json({
    error: {
      message: 'Something Went Wrong',
    },
  });
};

export default errorHandlerMiddleWare;
