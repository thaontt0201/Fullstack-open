const Total = ({ course }) => {
  const sum =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;
  return <p style={{ fontWeight: "bold" }}>Number of exercises {sum}</p>;
};

export default Total;