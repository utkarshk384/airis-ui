import { jsPDF } from "jspdf";
import { FormatDate } from "./dates-fns";

export const exportHtmlStr2PDF = async (val: string) => {
  let el = document.createElement("div");
  el.style.width = "400px";
  el.style.fontSize = "10px";
  el.style.display = "block";
  el.style.padding = "20px";
  el.innerHTML = val;

  const now = FormatDate(new Date(), "dd-MM-yyyy");

  var options = {
    margin: [10, 10, 10, 10],
    callback: function (pdf: jsPDF) {
      pdf.save(`report-${now}.pdf`);
      el.remove();
    },
  };

  const pdf = new jsPDF("p", "px", "letter");
  pdf.html(el, options);
};
