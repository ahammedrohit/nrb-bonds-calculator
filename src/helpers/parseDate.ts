import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const parseToDateAndTime = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss');
    } else {
        return '-'
    }
}

export const parseToYMD = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format('YYYY/MM/DD')
    } else {
        return '-'
    }

}

export const parseToYMDHM = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format('YYYY/MM/DD HH:mm')
    } else {
        return '-'
    }

}

export const parseToYYYYMMDD = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format('YYYY-MM-DD')
    } else {
        return '-'
    }

}

export const parseToYMDJa = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format("YYYY年MM月DD日（ddd）")
    } else {
        return '-'
    }
}

export const parseToTimeJa = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format("HH:mm:ss")
    } else {
        return '-'
    }
}

export const parseToTimeJaWithAMPM = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format("hh:mm:ss A")
    } else {
        return '-'
    }
}

export const formatToYMD = (d: string) => {
    if (dayjs(d, 'YYYY/MM/DD').isValid()) {
        return dayjs(d).format('YYYY/MM/DD')
    } else {
        return parseToYMD(new Date())
    }
}

export const formatToYYYYMMDD = (d: string | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).format('YYYY-MM-DD')
    } else {
        return '-'
    }
}

export const parseToDateObject = (d: string) => {
    const valid = dayjs(d).isValid()
    if (valid) {
        return new Date(d)
    } else {
        return new Date()
    }
}

export const defaultParseToYMD = (d: string | null) => {
    if (d) {
        return dayjs(d).format('YYYY/MM/DD')
    } else {
        return parseToYMD(new Date())
    }
}

export const formatToYMDForBreakTime = (d: Date) => {
    return dayjs(d).format('YYYY年 MM月 DD日')
}

export const formatToHHMMSSForBreakTime = (d: Date) => {
    return d.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
}

export const parseToShortDateAndTime = (d: Date | undefined) => {
    if (d !== null && d !== undefined) {
        return dayjs(d).tz('Asia/Tokyo').format('YYYY-MMM-DD HH:mm');
    } else {
        return '-'
    }
}

export const parseToYMDHMS = (date?: Date) => {
    if (date) {
        const year = date.getFullYear().toString().padStart(4, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const formattedString = `${year}/${month}/${day}/${hours}/${minutes}/${seconds}`;
        return formattedString;
    }
    return ""
};

export const parseYMDHMS = (dateString?: string) => {
    const dateRegexSlash = /^\d{4}\/\d{2}\/\d{2}$/;
    const dateRegexHyphen = /^\d{4}\-\d{2}\-\d{2}$/;
    const dateTimeRegex = /\d{4}\/\d{2}\/\d{2}\/\d{2}\/\d{2}\/\d{2}$/;

    if (dateString) {
        if (dateTimeRegex.test(dateString)) {
            const [year, month, day, hours, minutes, seconds] = dateString.split("/");
            return new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
                Number(hours),
                Number(minutes),
                Number(seconds)
            );
        }

        if (dateRegexSlash.test(dateString)) {
            const [year, month, day] = dateString.split("/");
            return new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );
        }

        if (dateRegexHyphen.test(dateString)) {
            const [year, month, day] = dateString.split("-");
            return new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );
        }
    }
    return;
}