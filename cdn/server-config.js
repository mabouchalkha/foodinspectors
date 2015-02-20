module.exports = {
  port: process != null && process.env != null && process.env.PORT != null ? process.env.PORT : 3444,
  ip: process != null && process.env != null && process.env.IP ? process.env.IP: '127.0.0.1',
  //static_site_root: __dirname + '/../build' //up a dir and find build
  static_site_root: __dirname + '/../dist' //up a dir and find build
};