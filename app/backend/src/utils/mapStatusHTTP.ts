export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'INVALID_DATA': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'INVALID_MATCH': return 422;
    case 'NOT_FOUND': return 404;
    default: return 500;
  }
}
