import app from './app';

const server = app.listen(app.get("port"), () => {
    console.log(`app listen on ${app.get('port')}`);
});

export default server;