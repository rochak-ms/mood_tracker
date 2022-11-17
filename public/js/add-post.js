async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const emoji = document.querySelector('input[name="emoji"]').value;
    const content = document.querySelector('input[name="content"]').value;
  

    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        emoji,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);
  