import FlatfileImporter from "flatfile-csv-importer";
import $ from "jquery";

FlatfileImporter.setVersion(2);

const robotImporter = new FlatfileImporter(
  "2bda9380-a84c-11e7-8243-1d92e7c67d6d",
  {
    fields: getFields(),
    type: "Accounts",
    allowInvalidSubmit: true,
    managed: true,
    disableManualInput: false
  }
);

robotImporter.setCustomer({ userId: "1234" });

$("#launch").click(function () {
  robotImporter.setCustomer({ userId: 1, email: "me@david.gs" });
  robotImporter
    .requestDataFromUser()
    .then(function (results) {
      robotImporter.displaySuccess();
      $("#raw_output").text(JSON.stringify(results.data, " ", 2));
    })
    .catch(function (error) {
      console.info(error || "window close");
    });
});

/**
 * function for generating the field configuration dynamically
 */
function getFields() {
  const fields = [
    {
      label: "First Name",
      key: "firstName",
      validators: [
        { validate: "unique", fields: ["firstName"] },
        { validate: "required", fields: ["firstName"] }
      ]
    }
  ];

  return fields;
}
