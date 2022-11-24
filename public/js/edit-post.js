async function editFormHandler(event) {
  event.preventDefault();
  // need to make sure that we are calling the right values here
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const emoji = document.querySelector('input[name="emoji"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();
  console.log(title);
  console.log(emoji);
  console.log(content);

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      emoji,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // make sure that this is the right redirection
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
