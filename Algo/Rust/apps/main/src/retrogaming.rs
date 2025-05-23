mod peinture;

use std::{fs, time};
use std::ops::Add;
use time::Duration;

#[derive(Debug)]
struct Coord {
    x: usize,
    y: usize
}

impl PartialEq for &Coord {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }

}

fn main() {
    let input = fs::read_to_string("../inputs/course5.txt")
        .expect("failed to read file");

    let content: Vec<&str> = input.split("\r\n").collect();

    let content: Vec<Vec<&str>> = content.iter()
        .map(|line| line.trim().split(" ").collect::<Vec<_>>()).collect();

    let mut time: Duration = Duration::new(0, 0);
    let last = Coord {
        x: 2999,
        y: 3999
    };

    let mut current: Coord = Coord {
        x: 1, y: 0
    };

    while &current != &last {
        println!("{:?}, {:?}", current, last);
        let current_value = content[current.x][current.y].parse().unwrap();

        let poss1 = Coord {
            x: current.x+1,
            y: current.y
        };
        let poss2 = Coord {
            x: current.x,
            y: current.y+1
        };
        let next_coord: Coord;

        if poss1.x > last.x {
            next_coord = poss2;
            println!("b1")
        } else if poss2.y > last.y {
            next_coord = poss1;
            println!("b2");
        } else {
            println!("else");
            if content[poss1.x][poss1.y] < content[poss2.x][poss2.y] {
                next_coord = Coord {
                    ..poss1
                };
            } else {
                next_coord = Coord {
                    ..poss2
                };
            }
        }

        println!("{:?}", next_coord);

        let new_value: usize = content[next_coord.x][next_coord.y].parse().unwrap();

        let mut a: usize = 1;
        if new_value < current_value {
            let take = 2;
            a = (current_value - new_value) * take;

        } else if new_value > current_value {
            let take = 4;
            a = (new_value - current_value) * take;
        }

        time = time.add(Duration::from_secs(a as u64));

        current = next_coord;

    }


    println!("{:?}", time);
}
