<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Marks Report</title>
</head>
<body>
    <h2>Student Marks Report</h2>

    <form method="get">
        Enter student name:
        <input type="text" name="student_name">
        <input type="submit" value="Submit">
    </form>

    <hr>

    <?php
        function average($total, $count)
        {
            return $total / $count;
        }

        $marks = array(75, 42, 89, 56, 33);

        echo "<h3>All Marks</h3>";

        foreach ($marks as $mark) {
            echo $mark . "<br>";
        }

        $total = 0;
        $max = $marks[0];
        $min = $marks[0];
        $pass = 0;
        $fail = 0;

        foreach ($marks as $mark) {
            $total = $total + $mark;

            if ($mark > $max) {
                $max = $mark;
            }

            if ($mark < $min) {
                $min = $mark;
            }

            if ($mark >= 50) {
                $pass++;
            } else {
                $fail++;
            }
        }

        $count = count($marks);
        $avg = average($total, $count);
        $avgInt = (int) $avg;

        echo "<h3>Calculation</h3>";
        echo "Total marks: " . $total . "<br>";
        echo "Average marks: " . $avg . "<br>";
        echo "Average after type casting to integer: " . $avgInt . "<br>";
        echo "Maximum marks: " . $max . "<br>";
        echo "Minimum marks: " . $min . "<br>";
        echo "Passed students: " . $pass . "<br>";
        echo "Failed students: " . $fail . "<br>";
        echo "Number of students using count(): " . $count . "<br>";

        sort($marks);

        echo "<h3>Sorted Marks</h3>";

        foreach ($marks as $mark) {
            echo $mark . "<br>";
        }

        $student = array(
            "name" => "Nusrat Jahan",
            "id" => "CSE-101",
            "cgpa" => 3.72
        );

        echo "<h3>Student Details</h3>";

        foreach ($student as $key => $value) {
            echo $key . " : " . $value . "<br>";
        }

        echo "<h3>String Operations</h3>";
        echo "Name in uppercase: " . strtoupper($student["name"]) . "<br>";
        echo "Length of name: " . strlen($student["name"]) . "<br>";

        echo "<h3>Input From GET</h3>";

        if (isset($_GET["student_name"]) && $_GET["student_name"] != "") {
            echo "Student name entered: " . $_GET["student_name"];
        } else {
            echo "No student name entered.";
        }
    ?>
</body>
</html>
