const ids = ["sleep_lab", "sleep",
  "diet_lab", "diet",
  "exp_lab", "expenses",
  "inc_lab", "income",
  "exer_lab", "exercise",
  "work_lab", "work",
  "notes_lab", "notes",
  "submit"];

for (id of ids){
  document.getElementById(id).style.gridArea = id;
}
