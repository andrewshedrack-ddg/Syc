# Ereteti Dairy Sacco

A small website for Ereteti Dairy Sacco, a milk collection sacco on the
Ngong road since 1998. Around eight hundred farmers deliver milk twice a
day on three routes (Kiserian, Ngong, Rongai), and the sacco pays for
every accepted litre once a month.

This is the DBT 1305 Web Application Development coursework site
(Weeks 2, 6, 7 and the Week 8 JavaScript practical), built with plain
HTML, one stylesheet and plain JavaScript. No framework, no server.

## Pages

- `index.html` — Home. What the sacco is and where it collects.
- `about.html` — About. The sacco history: nine farmers and one cooler.
- `routes.html` — Our routes. The three routes, times and centres,
  with a search box to filter them.
- `deliveries.html` — Record a delivery. A form (member number, litres,
  route, date) and a table of recent deliveries with a litres total.
- `members.html` — Our members. How to join, and a searchable table
  of members.
- `milk.html` — Our milk. How milk is collected, tested and paid for,
  and what makes good milk.
- `contact.html` — Contact. Postal address, telephone and email.

## How to open it

- Double-click `index.html` to open it in a browser, or
- Copy the whole `ereteti-sacco` folder to `C:\xampp\htdocs\ereteti-sacco`,
  start Apache in XAMPP, and open `http://localhost/ereteti-sacco/`.

## The JavaScript (Week 8 practical)

`js/main.js` is plain JavaScript, linked with `defer` from all seven
pages. It does:

- Litres check: litres must be a number between 1 and 200.
- Member-number check: the number must look like ER-0042
  (ER- followed by exactly 4 digits).
- Submit guard: the delivery form is checked before it is accepted;
  a bad value shows an error and focuses the field.
- Routes search: typing in the search box on the routes page shows
  only the matching routes and centres.
- Members search: typing in the search box on the members page filters
  the table by member number or name.
- Table total: the litres total on the deliveries page is worked out
  from the table and updated when a new delivery is added.

The delivery form has no server behind it, so a recorded delivery is
only added as a row on the page. It is not saved anywhere.
