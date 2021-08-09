var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var util = require("util");
//util.format('dinh ta tuan linh %d', 3);// thư viện util của nodejs giúp đưa biến vào trong một chuỗi
// format <string> A printf-like format string.
// The util.format() method returns a formatted string using the first argument as a printf-like format string which can contain zero or more format specifiers. Each specifier is replaced with the converted value from the corresponding argument. Supported specifiers are:
//     %s: String will be used to convert all values except BigInt, Object and -0. BigInt values will be represented with an n and Objects that have no user defined toString function are inspected using util.inspect() with options { depth: 0, colors: false, compact: 3 }.
//     %d: Number will be used to convert all values except BigInt and Symbol.
//     %i: parseInt(value, 10) is used for all values except BigInt and Symbol.
//     %f: parseFloat(value) is used for all values expect Symbol.
//     %j: JSON. Replaced with the string '[Circular]' if the argument contains circular references.
//     %o: Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() with options { showHidden: true, showProxy: true }. This will show the full object including non-enumerable properties and proxies.
//     %O: Object. A string representation of an object with generic JavaScript object formatting. Similar to util.inspect() without options. This will show the full object not including non-enumerable properties and proxies.
//     %c: CSS. This specifier is ignored and will skip any CSS passed in.
//     %%: single percent sign ('%'). This does not consume an argument.
//     Returns: <string> The formatted string
// If a specifier does not have a corresponding argument, it is not replaced:
// util.format('%s:%s', 'foo');
// // Returns: 'foo:%s'

const ItemsModel = require(__pathSchemas + "database").itemsModel; // kéo module items trong schemas để truy cập bảng items trong database
const utility = require(__pathHelps + "utility"); // kéo các hàm trong utility helper vào
const itemsValidation = require(__pathValidation + "items"); // keo ham validator
router.get("/", (req, res, next) => {
  // khi truyền dữ liệu qua đường dẫn để lấy được dữ liệu đấy ta thêm /:status vào router. Nếu ko có dữ liệu truyền trên đường dẫn thì thêm (/:status)? nghĩa là có ý nghĩa là chuỗi được gửi lên có cũng được ko có cũng được

  res.render(`inc/admin/items/list`, {
    layout: "admin/auth",
  });
});
