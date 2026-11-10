// Ereteti Dairy Sacco - main.js
// Plain JavaScript, no framework. Linked with defer from every page,
// so each feature first checks that its elements exist on the page
// and quietly skips that feature if they do not.

// ---------- Delivery form: litres check, member-number check, submit guard ----------

var deliveryForm = document.getElementById("deliveryForm");
var formError = document.getElementById("formError");

if (deliveryForm && formError) {
    var memberInput = document.getElementById("memberNumber");
    var litresInput = document.getElementById("litres");
    var routeSelect = document.getElementById("route");
    var dateInput = document.getElementById("deliveryDate");

    // Show a message under the form. Green for success, red for an error.
    function showFormMessage(text, isSuccess) {
        formError.textContent = text;
        if (isSuccess) {
            formError.className = "success";
        } else {
            formError.className = "error";
        }
    }

    // Litres must be a number greater than 0 and not more than 200.
    function litresIsValid() {
        var value = Number(litresInput.value);
        if (litresInput.value === "" || isNaN(value) || value <= 0 || value > 200) {
            showFormMessage("Litres must be a number between 1 and 200.", false);
            return false;
        }
        return true;
    }

    // Member number must look like ER-0042: ER- followed by exactly 4 digits.
    function memberNumberIsValid() {
        var pattern = /^ER-[0-9]{4}$/;
        if (!pattern.test(memberInput.value.trim())) {
            showFormMessage("Member number must look like ER-0042 (ER- followed by 4 digits).", false);
            return false;
        }
        return true;
    }

    // Recompute the total litres from the table body and write it into #litresTotal.
    function updateLitresTotal() {
        var totalCell = document.getElementById("litresTotal");
        if (!totalCell) {
            return;
        }
        var total = 0;
        var rows = document.querySelectorAll("#deliveriesTable tbody tr");
        rows.forEach(function (row) {
            var litresCell = row.cells[3];
            if (litresCell) {
                total += Number(litresCell.textContent) || 0;
            }
        });
        totalCell.textContent = total;
    }

    // Add the new delivery as a row at the end of the deliveries table.
    function addDeliveryRow() {
        var tableBody = document.querySelector("#deliveriesTable tbody");
        if (!tableBody) {
            return;
        }
        var row = document.createElement("tr");
        var memberCell = document.createElement("td");
        memberCell.textContent = memberInput.value.trim();
        var routeCell = document.createElement("td");
        routeCell.textContent = routeSelect.value;
        var dateCell = document.createElement("td");
        dateCell.textContent = dateInput.value;
        var litresCell = document.createElement("td");
        litresCell.textContent = Number(litresInput.value);
        row.appendChild(memberCell);
        row.appendChild(routeCell);
        row.appendChild(dateCell);
        row.appendChild(litresCell);
        tableBody.appendChild(row);
        updateLitresTotal();
    }

    // Submit guard: run both checks. If either fails, stop the form
    // from submitting and focus the first invalid field.
    deliveryForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var memberOk = memberNumberIsValid();
        if (!memberOk) {
            memberInput.focus();
            return;
        }
        var litresOk = litresIsValid();
        if (!litresOk) {
            litresInput.focus();
            return;
        }
        // Both checks passed. Record the delivery on the page only.
        // The form has no server, so nothing is sent anywhere.
        addDeliveryRow();
        showFormMessage("Delivery recorded. Thank you.", true);
        deliveryForm.reset();
    });
}

// ---------- Routes search filter (routes.html) ----------

var routeSearch = document.getElementById("routeSearch");

if (routeSearch) {
    routeSearch.addEventListener("input", function () {
        var text = routeSearch.value.toLowerCase().trim();
        var routes = document.querySelectorAll(".route");
        routes.forEach(function (routeSection) {
            // A route section stays visible if its own text contains
            // the typed text, or if any of its centres does.
            var sectionText = routeSection.textContent.toLowerCase();
            var sectionMatches = text === "" || sectionText.indexOf(text) !== -1;
            routeSection.style.display = sectionMatches ? "" : "none";
            // Inside a visible section, hide only the centre items
            // that do not match, so the matching centres stand out.
            var centres = routeSection.querySelectorAll(".centre");
            centres.forEach(function (centre) {
                var centreMatches = text === "" || centre.textContent.toLowerCase().indexOf(text) !== -1;
                centre.style.display = centreMatches ? "" : "none";
            });
        });
    });
}

// ---------- Members search filter (members.html) ----------

var memberSearch = document.getElementById("memberSearch");

if (memberSearch) {
    memberSearch.addEventListener("input", function () {
        var text = memberSearch.value.toLowerCase().trim();
        var rows = document.querySelectorAll("#membersTable tbody tr");
        rows.forEach(function (row) {
            // Match against the member number (first cell) or the name (second cell).
            var number = row.cells[0] ? row.cells[0].textContent.toLowerCase() : "";
            var name = row.cells[1] ? row.cells[1].textContent.toLowerCase() : "";
            var matches = text === "" || number.indexOf(text) !== -1 || name.indexOf(text) !== -1;
            row.style.display = matches ? "" : "none";
        });
    });
}

// ---------- Table total: deliveries (deliveries.html) ----------

// On page load, add up the Litres column and write the total into #litresTotal.
(function computeLitresTotalOnLoad() {
    var totalCell = document.getElementById("litresTotal");
    if (!totalCell) {
        return;
    }
    var total = 0;
    var rows = document.querySelectorAll("#deliveriesTable tbody tr");
    rows.forEach(function (row) {
        var litresCell = row.cells[3];
        if (litresCell) {
            total += Number(litresCell.textContent) || 0;
        }
    });
    totalCell.textContent = total;
})();
