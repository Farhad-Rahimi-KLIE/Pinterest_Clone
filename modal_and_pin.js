const add_pin_modal = document.querySelector(".add_pin_modal");
document.querySelector(".add_pin").addEventListener("click", () => {
  add_pin_modal.style.opacity = 1;
  add_pin_modal.style.pointerEvents = "all";
});
document.querySelector(".add_pin_modal").addEventListener("click", (event) => {
  if (event.target === add_pin_modal) {
    reset_modal();
  }
});
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

  create_pin(users_data);
  reset_modal();
});

function create_pin(pin_details) {
  const new_pin = document.createElement("DIV");
  const new_image = new Image();

  new_image.src = pin_details.img_blob;
  new_pin.style.opacity = 0;

  new_image.onload = function () {
    new_pin.classList.add("card");

    new_pin.innerHTML = `
    <div class="pin_title">${pin_details.title}</div>

    <div class="pin_modal">
      <div class="modal_head">
        <div class="save_card">Save</div>
      </div>
      <div class="modal_foot"></div>
      <span>${pin_details.destination}</span>
    </div>
    <div class="pin_image">
    </div>
    `;

    document.querySelector(".pin_container").appendChild(new_pin);
    new_pin.children[2].appendChild(new_image);
    new_pin.style.opacity = 1;
  };
}

function reset_modal() {
  const modals_pin = document.querySelector(".add_pin_modal .modals_pin");
  add_pin_modal.style.opacity = 0;
  add_pin_modal.style.pointerEvents = "none";
  document.querySelector("#uplaod_img_label").style.display = "block";
  modals_pin.style.display = "none";
  modals_pin.style.opacity = 0;

  if (modals_pin.children[0].children[0])
    modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
  document.querySelector("#pin_title").value = "";
  document.querySelector("#pin_description").value = "";
  document.querySelector("#pin_desctination").value = "";
  document.querySelector("#pin_size").value = "";
  pin_image_blob = null;
}
