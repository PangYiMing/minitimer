/*
 * @Author: pym
 * @Date: 2022-02-04 13:02:08
 * @LastEditors: pym
 * @Description: 
 * @LastEditTime: 2022-02-04 13:20:53
 */
const path = require('path');
const sStatic = require('koa-static');
const Koa = require('koa');
const route = require("koa-route");
const glob = require('glob');
const koaBody = require("koa-body");
const cors = require('@koa/cors');
require('./serverLib/consoleUp');
const app = new Koa();

app
    .use(cors())
    .use(require('koa-compress')())
    .use(sStatic(path.join(__dirname, 'dist')))
    .use(sStatic(path.join(__dirname, 'public')))
    .use(
        koaBody({
            jsonLimit: '50mb',
        })
    );

// ----------------


setPostApi()
function json(ctx) {
    return function (jn) {
        ctx.body = JSON.stringify(jn)
    }
}

function addJsonApi(fn) {

    return async function (ctx) {
        const { request, res } = ctx
        request.cookies = {
            'principal_dev': ctx.cookies.get('principal_dev')
        }
        res.json = json(ctx)
        await fn(request, res)
    }
}
function setPostApi() {


    let fileList = glob.sync(path.join(__dirname, './middleware/post/*.js'));
    fileList.map((file) => {
        const { reg, fn } = require(file)
        app.use(route.post(reg, addJsonApi(fn)));
    });
    fileList = glob.sync(path.join(__dirname, './middleware/get/*.js'));
    fileList.map((file) => {
        const { reg, fn } = require(file)
        app.use(route.get(reg, addJsonApi(fn)));
    });
}


app.listen(5385);
