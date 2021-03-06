class GetToken {
  public static handle(req: any) {
    let token = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : null;
    return token && token.length ? token : null;
  }
}

export default GetToken;
