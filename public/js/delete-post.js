async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // need to make sure that this is the right direction
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

// need to make sure that these are the same 
document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);