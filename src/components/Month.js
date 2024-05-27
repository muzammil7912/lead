export const Monthss = (monthh,yearr) => {
  let date = new Date();
  let monthss = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`;
  let year = date.getFullYear();
  var mont = {
		"01": "Janunary",
		"02": "February",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "August",
		"09": "September",
		"10": "Octuber",
		"11": "November",
		"12": "December"
	};
    const months = ["Jan","Feb","M","A","M","J","July","Aug","sep","O","N","D"]
     return  `${mont[monthh] || mont[monthss]} ${yearr || year}`;
   };