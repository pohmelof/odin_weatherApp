export default function handleError(error, message = "Something went wrong") {
  const errorEl = document.querySelector(".error");
  errorEl.innerText = `Error: ${message}`;
  errorEl.classList.remove("hidden");
  setTimeout(() => {
    errorEl.classList.add("hidden");
  }, 2000);
  console.log(error);
}
