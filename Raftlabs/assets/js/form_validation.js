function validateForm() {
   
    let x = document.forms["myForm"]["isbn"].value.length;
    if (x>12||x<12) {
      alert("Length of ISBN no must be 12.Kindly add the right ISBN number.");
      return false;
    }
  }