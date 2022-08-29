CREATE DATABASE IF NOT EXISTS vr;
USE vr;

GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

ALTER USER 'user' IDENTIFIED WITH mysql_native_password BY 'user';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS students (
    code INT NOT NULL PRIMARY kEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    code INT NOT NULL PRIMARY kEY AUTO_INCREMENT,
    description VARCHAR(50) NOT NULL,
    program TEXT
);

CREATE TABLE IF NOT EXISTS students_courses (
    code INT NOT NULL PRIMARY kEY AUTO_INCREMENT,
    code_courses INT NOT NULL,
    CONSTRAINT `courses_foreign_key` FOREIGN KEY (code_courses) REFERENCES courses (code) ON DELETE NO ACTION  ON UPDATE NO ACTION,
    code_students INT NOT NULL,
    CONSTRAINT `students_foreign_key` FOREIGN KEY (code_students) REFERENCES students (code) ON DELETE NO ACTION  ON UPDATE NO ACTION
);
