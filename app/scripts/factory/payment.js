"use strict";
app
.factory("Payment",	function () {

	var Payment = {
		1	:	"ต่ำกว่า 500",
		2	:	"501 - 1,000",
		3	:	"1,001 - 2,000",
		4	:	"2,001 - 4,000",
		5	:	"4,001 - 7,000",
		6	:	"7,001 - 10,000",
		7	:	"มากกว่า 10,000"
	};

	return Payment;
});