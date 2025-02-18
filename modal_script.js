let pin_image_blob = null;

document.querySelector("#uplaod_img").addEventListener("change", (event) => {
  if (event.target.files && event.target.files[0]) {
    if (/image\/*/.test(event.target.files[0].type)) {
      const reader = new FileReader();

      reader.onload = function () {
        const new_image = new Image();

        new_image.src = reader.result;
        pin_image_blob = reader.result;

        new_image.onload = function () {
          const modals_pin = document.querySelector(
            ".add_pin_modal .modals_pin"
          );
          document
            .querySelector(".add_pin_modal .pin_image")
            .appendChild(new_image);
          document.querySelector("#uplaod_img_label").style.display = "none";

          modals_pin.style.display = "block";
          modals_pin.style.opacity = 1;
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  document.querySelector("#uplaod_img").value = "";
});
document.querySelector(".save_pin").addEventListener("click", () => {
  const users_data = {
    author: "jack",
    board: "default",
    title: document.querySelector("#pin_title").value,
    description: document.querySelector("#pin_description").value,
    title: document.querySelector("#pin_desctination").value,
    img_blob: pin_image_blob,
    pin_size: document.querySelector("#pin_size").value,
  };
  console.log(users_data);
});
