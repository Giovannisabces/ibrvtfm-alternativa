// To parse this data:
//
//   import { Convert, IVideos } from "./file";
//
//   const iVideos = Convert.toIVideos(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IVideos {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    items:         Item[];
}

export interface Item {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Snippet;
}

export interface Snippet {
    publishedAt:            Date;
    channelId:              string;
    title:                  string;
    description:            string;
    thumbnails:             Thumbnails;
    channelTitle:           string;
    playlistId:             string;
    position:               number;
    resourceId:             ResourceID;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId:    string;
}

export interface ResourceID {
    kind:    string;
    videoId: string;
}

export interface Thumbnails {
    default:  Default;
    medium:   Default;
    high:     Default;
    standard: Default;
    maxres:   Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toIVideos(json: string): IVideos {
        return cast(JSON.parse(json), r("IVideos"));
    }

    public static videosToJson(value: IVideos): string {
        return JSON.stringify(uncast(value, r("IVideos")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "IVideos": o([
        { json: "kind", js: "kind", typ: "" },
        { json: "etag", js: "etag", typ: "" },
        { json: "nextPageToken", js: "nextPageToken", typ: "" },
        { json: "items", js: "items", typ: a(r("Item")) },
    ], false),
    "Item": o([
        { json: "kind", js: "kind", typ: "" },
        { json: "etag", js: "etag", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "snippet", js: "snippet", typ: r("Snippet") },
    ], false),
    "Snippet": o([
        { json: "publishedAt", js: "publishedAt", typ: Date },
        { json: "channelId", js: "channelId", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "thumbnails", js: "thumbnails", typ: r("Thumbnails") },
        { json: "channelTitle", js: "channelTitle", typ: "" },
        { json: "playlistId", js: "playlistId", typ: "" },
        { json: "position", js: "position", typ: 0 },
        { json: "resourceId", js: "resourceId", typ: r("ResourceID") },
        { json: "videoOwnerChannelTitle", js: "videoOwnerChannelTitle", typ: "" },
        { json: "videoOwnerChannelId", js: "videoOwnerChannelId", typ: "" },
    ], false),
    "ResourceID": o([
        { json: "kind", js: "kind", typ: "" },
        { json: "videoId", js: "videoId", typ: "" },
    ], false),
    "Thumbnails": o([
        { json: "default", js: "default", typ: r("Default") },
        { json: "medium", js: "medium", typ: r("Default") },
        { json: "high", js: "high", typ: r("Default") },
        { json: "standard", js: "standard", typ: r("Default") },
        { json: "maxres", js: "maxres", typ: r("Default") },
    ], false),
    "Default": o([
        { json: "url", js: "url", typ: "" },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
    ], false),
};
