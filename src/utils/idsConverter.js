const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$'";

function compress(g) {
    let bs = [];
    for (let i = 0; i < g.length; i += 2) {
        bs.push(parseInt(g.slice(i, i + 2), 16));
    }

    function b64(v, l = 4) {
        let result = "";
        for (let i = l - 1; i >= 0; i--) {
            result += chars[Math.floor(v / Math.pow(64, i)) % 64];
        }
        return result;
    }

    let compressed = b64(bs[0], 2);
    for (let i = 1; i < 16; i += 3) {
        compressed += b64((bs[i] << 16) + (bs[i + 1] << 8) + bs[i + 2]);
    }

    return compressed;
}

function expand(g) {
    function b64(v) {
        return v.split("").reduce((a, c) => a * 64 + chars.indexOf(c), 0);
    }

    let bs = [b64(g.slice(0, 2))];
    for (let i = 0; i < 5; i++) {
        let d = b64(g.slice(2 + 4 * i, 6 + 4 * i));
        for (let j = 0; j < 3; j++) {
            bs.push((d >> (8 * (2 - j))) % 256);
        }
    }

    return bs.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function split(g) {
    return `${g.slice(0, 8)}-${g.slice(8, 12)}-${g.slice(12, 16)}-${g.slice(16, 20)}-${g.slice(20)}`;
}

export function euid2guid(euid) {
    return compress(euid.replaceAll("-", ""));
}

export function guid2euid(guid) {
    return split(expand(guid));
}
