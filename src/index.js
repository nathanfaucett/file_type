var hasOwnProp = Object.prototype.hasOwnProperty,
    SVG = /<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>/;


function fileType(value) {
    var buf = Buffer.isBuffer(value) ? value : new Buffer(value),
        key;

    for (key in fileType) {
        if (hasOwnProp.call(fileType, key)) {
            if (fileType[key](buf)) {
                return key;
            }
        }
    }

    return undefined;
}

module.exports = fileType;

fileType.svg = function(buf) {
    if (!buf) {
        return false;
    }

    return SVG.test(buf);
};

fileType.png = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 137 &&
        buf[1] === 80 &&
        buf[2] === 78 &&
        buf[3] === 71
    );
};

fileType.jpg = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 255 &&
        buf[1] === 216 &&
        buf[2] === 255
    );
};

fileType.gif = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 71 &&
        buf[1] === 73 &&
        buf[2] === 70
    );
};

fileType.webp = function(buf) {
    if (!buf || buf.length < 12) {
        return false;
    }

    return (
        buf[8] === 87 &&
        buf[9] === 69 &&
        buf[10] === 66 &&
        buf[11] === 80
    );
};

fileType.tif = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 73 &&
        buf[1] === 73 &&
        buf[2] === 42 &&
        buf[3] === 0
    ) || (
        buf[0] === 77 &&
        buf[1] === 77 &&
        buf[2] === 0 &&
        buf[3] === 42
    );
};

fileType.bmp = function(buf) {
    if (!buf || buf.length < 2) {
        return false;
    }

    return buf[0] === 66 && buf[1] === 77;
};

fileType.jxr = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 73 &&
        buf[1] === 73 &&
        buf[2] === 188
    );
};

fileType.psd = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 56 &&
        buf[1] === 66 &&
        buf[2] === 80 &&
        buf[3] === 83
    );
};

fileType["7z"] = function(buf) {
    if (!buf || buf.length < 5) {
        return false;
    }

    return (
        buf[0] === 55 &&
        buf[1] === 122 &&
        buf[2] === 188 &&
        buf[3] === 175 &&
        buf[4] === 39 &&
        buf[5] === 28
    );
};

fileType.bz2 = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 66 &&
        buf[1] === 90 &&
        buf[2] === 104
    );
};

fileType.gz = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 31 &&
        buf[1] === 139 &&
        buf[2] === 8
    );
};

fileType.rar = function(buf) {
    if (!buf || buf.length < 7) {
        return false;
    }

    return (
        buf[0] === 82 &&
        buf[1] === 97 &&
        buf[2] === 114 &&
        buf[3] === 33 &&
        buf[4] === 26 &&
        buf[5] === 7 && (
            buf[6] === 0 ||
            buf[6] === 1
        )
    );
};

fileType.tar = function(buf) {
    if (!buf || buf.length < 262) {
        return false;
    }

    return (
        buf[257] === 117 &&
        buf[258] === 115 &&
        buf[259] === 116 &&
        buf[260] === 97 &&
        buf[261] === 114
    );
};

fileType.zip = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 80 &&
        buf[1] === 75 && (
            buf[2] === 3 ||
            buf[2] === 5 ||
            buf[2] === 7
        ) && (
            buf[3] === 4 ||
            buf[3] === 6 ||
            buf[3] === 8
        )
    );
};

fileType.pdf = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 37 &&
        buf[1] === 80 &&
        buf[2] === 68 &&
        buf[3] === 70
    );
};

fileType.epub = function(buf) {
    if (!buf || buf.length < 58) {
        return false;
    }

    return (
        buf[0] === 80 &&
        buf[1] === 75 &&
        buf[2] === 3 &&
        buf[3] === 4 &&
        buf.slice(30, 58).toString() === "mimetypeapplication/epub+zip"
    );
};

fileType.exe = function(buf) {
    if (!buf || buf.length < 2) {
        return false;
    }

    return (
        buf[0] === 77 &&
        buf[1] === 90
    );
};

fileType.mp3 = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        (
            buf[0] === 73 &&
            buf[1] === 68 &&
            buf[2] === 51
        ) || (
            buf[0] === 255 &&
            buf[1] === 251
        )
    );
};

fileType.flac = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 102 &&
        buf[1] === 76 &&
        buf[2] === 97 &&
        buf[3] === 67
    );
};

fileType.wav = function(buf) {
    if (!buf || buf.length < 12) {
        return false;
    }

    return (
        buf[0] === 82 &&
        buf[1] === 73 &&
        buf[2] === 70 &&
        buf[3] === 70 &&
        buf[8] === 87 &&
        buf[9] === 65 &&
        buf[10] === 86 &&
        buf[11] === 69
    );
};

fileType.ogg = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 79 &&
        buf[1] === 103 &&
        buf[2] === 103 &&
        buf[3] === 83
    );
};

fileType.m4a = function(buf) {
    if (!buf || buf.length < 8) {
        return false;
    }

    return (
        (
            buf[4] === 102 &&
            buf[5] === 116 &&
            buf[6] === 121 &&
            buf[7] === 112
        ) || (
            buf[0] === 77 &&
            buf[1] === 52 &&
            buf[2] === 65 &&
            buf[3] === 32
        )
    );
};

fileType.mp4 = function(buf) {
    if (!buf || buf.length < 8) {
        return false;
    }

    return (
        (
            buf[0] === 0 &&
            buf[1] === 0 &&
            buf[2] === 0 &&
            buf[3] === 24 &&
            buf[4] === 102 &&
            buf[5] === 116 &&
            buf[6] === 121 &&
            buf[7] === 112
        ) || (
            buf[0] === 51 &&
            buf[1] === 103 &&
            buf[2] === 112 &&
            buf[3] === 53
        )
    );
};

fileType.swf = function(buf) {
    if (!buf || buf.length < 2) {
        return false;
    }

    return (
        (
            buf[0] === 67 ||
            buf[0] === 70
        ) &&
        buf[1] === 87 &&
        buf[2] === 83
    );
};
