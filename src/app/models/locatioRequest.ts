import { Headers} from './headers';
import { Location} from './location';

export class LocationRequest{
    base64Encoded: boolean = false;
    body: Location[] = [];
    headers: Headers ;
    status: number = 200;

    constructor(
        base64Encoded: boolean = false,
        body: Location[],
        headers: Headers,
        status: number
        ) {
        this.base64Encoded = base64Encoded;
        this.body = body;
        this.headers = headers;
        this.status = status;

    }
}