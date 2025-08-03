document.getElementById('ageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const day = parseInt(document.getElementById('dayInput').value);
    const month = parseInt(document.getElementById('monthInput').value);
    const year = parseInt(document.getElementById('yearInput').value);

    document.getElementById('dayError').textContent = '';
    document.getElementById('monthError').textContent = '';
    document.getElementById('yearError').textContent = '';

    let isValid = true;

    if (isNaN(day)) {
        document.getElementById('dayError').textContent = 'This field is required';
        isValid = false;
    } else if (day < 1 || day > 31) {
        document.getElementById('dayError').textContent = 'Must be a valid day';
        isValid = false;
    }

    if (isNaN(month)) {
        document.getElementById('monthError').textContent = 'This field is required';
        isValid = false;
    } else if (month < 1 || month > 12) {
        document.getElementById('monthError').textContent = 'Must be a valid month';
        isValid = false;
    }

    if (isNaN(year)) {
        document.getElementById('yearError').textContent = 'This field is required';
        isValid = false;
    } else if (year > new Date().getFullYear() || year < 1900) {
        document.getElementById('yearError').textContent = 'Must be a valid year';
        isValid = false;
    }

    if (!isValid) return;

    // Check for valid date
    const testDate = new Date(year, month - 1, day);
    if (
        testDate.getFullYear() !== year ||
        testDate.getMonth() !== month - 1 ||
        testDate.getDate() !== day
    ) {
        document.getElementById('dayError').textContent = 'Must be a valid date';
        return;
    }

    const today = new Date();
    if (testDate > today) {
        document.getElementById('dayError').textContent = 'Date must be in the past';
        return;
    }

    let ageYears = today.getFullYear() - year;
    let ageMonths = today.getMonth() - (month - 1);
    let ageDays = today.getDate() - day;

    if (ageDays < 0) {
        ageMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById('yearsResult').textContent = ageYears;
    document.getElementById('monthsResult').textContent = ageMonths;
    document.getElementById('daysResult').textContent = ageDays;
});