export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
  accountId?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
