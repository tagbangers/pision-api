const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Pision', address: req.headers.host });
});

app.post('/', function(req, res, next) {
  // とりあえず仮のSlackからのPostデータ
  const { user_id, team_id, text } = req.body;
  console.log(`message: ${text}, from ${team_id} : ${user_id}`);

  // io.emitは全員にイベントを送る
  // req.app.io.emit('message', req.body.text)

  // io.toで特定のroomにだけイベントを発火
  req.app.io.to(user_id + team_id).emit('message', text);

  // slackからのPOSTへのレスポンスは適当に200を返しとく
  // おそらくslack app からの投稿に対するBotの返答をカスタマイズするならちゃんとしたレスポンスを返す
  res.status(200).json({ text: '🕊️ Sent your message!' });
});

io.on('connection', socket => {
  console.log('connected from', socket.handshake.query.workspace);

  const { user_id, team_id } = socket.handshake.query;
  // roomを作る
  socket.join(user_id + team_id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || '3000', function() {
  console.log('litening on 3000');
});
