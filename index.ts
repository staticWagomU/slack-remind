import {
  Checkbox,
  Input,
  prompt,
  Select,
} from "https:deno.land/x/cliffy@v0.20.1/prompt/mod.ts";
import clipboard from "https://deno.land/x/clipboard@v0.0.2/mod.ts";

const result = await prompt([{
  name: "destination",
  message: "宛先を入力してください。",
  type: Input,
  default: "me",
}, {
  name: "message",
  message: "メッセージを入力してください。",
  type: Input,
  after: async ({ message }, next) => {
    if (message === "") {
      console.error("メッセージを入力してください。");
      await next("message");
    } else {
      await next();
    }
  },
}, {
  name: "type",
  message: "リマインドのタイプを選択してください。",
  type: Select,
  options: [
    { name: "一回", value: "onetime" },
    { name: "繰り返し", value: "repetition" },
  ],
  after: async ({ type }, next) => {
    if (type === "onetime") {
      await next("date");
    } else {
      await next("repetition");
    }
  },
}, {
  name: "repetition",
  message: "繰り返し間隔を選択してください。",
  type: Select,
  options: [
    { name: "毎日", value: "everyday" },
    { name: "毎週", value: "every" },
    { name: "隔週", value: "other" },
    { name: "毎月", value: "everymonth" },
    { name: "毎年", value: "everyyear" },
  ],
  after: async ({ repetition }, next) => {
    switch (repetition) {
      case "everyday":
        await next("time");
        break;
      case "every":
        await next("every");
        break;
      case "other":
        await next("other");
        break;
      case "everymonth":
        await next("everymonth");
        break;
      case "everyyear":
        await next("everyyear");
        break;
    }
  },
}, {
  name: "everyday",
  message: "日付を入力してください。",
  type: Input,
  after: async ({ everyday }, next) => {
    await next("date");
  },
}, {
  name: "every",
  message: "日付を入力してください。",
  type: Select,
  options: [
    { name: "平日", value: "weekday" },
    { name: "休日", value: "Saturday, Sunday" },
    { name: "選択", value: "choice" },
  ],
  after: async ({ every }, next) => {
    if (every === "choice") {
      await next("choice");
    } else {
      await next("time");
    }
  },
}, {
  name: "choice",
  message: "日付を入力してください。",
  type: Checkbox,
  options: [
    { name: "日曜日", value: "Sunday" },
    { name: "月曜日", value: "Monday" },
    { name: "火曜日", value: "Tuesday" },
    { name: "水曜日", value: "Wednesday" },
    { name: "木曜日", value: "Thursday" },
    { name: "金曜日", value: "Friday" },
    { name: "土曜日", value: "Saturday" },
  ],
  after: async ({ choice }, next) => {
    await next("time");
  },
}, {
  name: "other",
  message: "曜日を入力してください。",
  type: Input,
  after: async ({ other }, next) => {
    await next("date");
  },
}, {
  name: "everymonth",
  message: "月を入力してください。",
  type: Input,
  after: async ({ everymonth }, next) => {
    await next("date");
  },
}, {
  name: "everyyear",
  message: "月を入力してください。",
  type: Input,
  after: async ({ everyyear }, next) => {
    await next("date");
  },
}, {
  name: "date",
  message: "日付を入力してください。(2022-03-10)",
  type: Input,
  after: async ({ date }, next) => {
    const dateRe = new RegExp(
      "^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
      "ig",
    );
    if (date !== undefined && !dateRe.test(date.toString())) {
      console.error("正しい日付を入力してください。");
      await next("date");
    } else {
      await next();
    }
  },
}, {
  name: "time",
  message: "時間を入力してください。(09:30)",
  type: Input,
  after: async ({ time }, next) => {
    const timeRe = new RegExp(
      "^([01][0-9]|2[0-3]):[0-5][0-9]$",
      "ig",
    );
    if (time !== undefined && !timeRe.test(time.toString())) {
      console.error("正しい時間を入力してください。");
      await next("time");
    }
  },
}]);
const formmatJson2Command = (str: string): string => {
const json = JSON.stringify(str);
return '';
}
console.log(result);
console.log(formmatJson2Command(result));
await clipboard.writeText('hello clipboard');
