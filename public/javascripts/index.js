const workspace = window.location.search.split("=")[1];

const socket = io(`http://localhost:3000?workspace=${workspace}`);

// const socket = io('http://localhost:3000?token=abc')

socket.on("message", msg => {
  const out = document.getElementById("msg");
  console.log("---", msg);
  out.innerText = msg;
});
