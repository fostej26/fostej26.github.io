/*
 * All ASCII art lives here. String.raw keeps backslashes literal; art()
 * strips the leading newline so each block can start on its own line.
 * Banners were generated with figlet (fonts: ANSI Shadow, Big, Small).
 */
const art = (s) => s.replace(/^\n/, "");
const BT = "`"; // figlet output contains backticks, which String.raw cannot hold

export const nameBanner = art(String.raw`
     ██╗ █████╗  ██████╗ ██████╗ ██████╗
     ██║██╔══██╗██╔════╝██╔═══██╗██╔══██╗
     ██║███████║██║     ██║   ██║██████╔╝
██   ██║██╔══██║██║     ██║   ██║██╔══██╗
╚█████╔╝██║  ██║╚██████╗╚██████╔╝██████╔╝
 ╚════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝

███████╗ ██████╗ ███████╗████████╗███████╗██████╗
██╔════╝██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
█████╗  ██║   ██║███████╗   ██║   █████╗  ██████╔╝
██╔══╝  ██║   ██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║     ╚██████╔╝███████║   ██║   ███████╗██║  ██║
╚═╝      ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
`);

export const jfLogo = art(String.raw`
    __    _ ________
   / /   | |  ____\ \
  / /    | | |__   \ \
 < < _   | |  __|   > >
  \ \ |__| | |     / /
   \_\____/|_|    /_/
`);

export const sectionBanners = {
  about: art(
    String.raw`
       _              _
  __ _| |__  ___ _  _| |_
 / _` +
      BT +
      String.raw` | '_ \/ _ \ || |  _|
 \__,_|_.__/\___/\_,_|\__|
`
  ),
  experience: art(String.raw`
                        _
  _____ ___ __  ___ _ _(_)___ _ _  __ ___
 / -_) \ / '_ \/ -_) '_| / -_) ' \/ _/ -_)
 \___/_\_\ .__/\___|_| |_\___|_||_\__\___|
         |_|
`),
  projects: art(String.raw`
                _        _
  _ __ _ _ ___ (_)___ __| |_ ___
 | '_ \ '_/ _ \| / -_) _|  _(_-<
 | .__/_| \___// \___\__|\__/__/
 |_|         |__/
`),
  contact: art(
    String.raw`
             _           _
  __ ___ _ _| |_ __ _ __| |_
 / _/ _ \ ' \  _/ _` +
      BT +
      String.raw` / _|  _|
 \__\___/_||_\__\__,_\__|\__|
`
  ),
};

export const companyLogos = {
  amd: art(String.raw`
    _   __  __ ___
   /_\ |  \/  |   \
  / _ \| |\/| | |) |
 /_/ \_\_|  |_|___/
`),
  l3harris: art(String.raw`
  _    _____  _   _   ___ ___ ___ ___
 | |  |__ / || | /_\ | _ \ _ \_ _/ __|
 | |__ |_ \ __ |/ _ \|   /   /| |\__ \
 |____|___/_||_/_/ \_\_|_\_|_\___|___/
`),
  solarcar: art(String.raw`
      \  |  /
    '.  ___  .'
  --   (   )   --
    .'  ~~~  '.
      /  |  \
   MAC SOLAR CAR
`),
};

export const projectIcons = {
  allergypal: art(String.raw`
  .-------.
  |   +   |
  |  +++  |
  |   +   |
  |_______|
  '--(o)--'
`),
  ontime: art(String.raw`
    .-""-.
   / 12   \
  |    |   |
  |    '-3 |
   \      /
    '-..-'
`),
  sumobot: art(String.raw`
    _______
   | o   o |
   |  ___  |
   '--| |--'
  [===| |===]
   /_/   \_\
`),
  portfolio: art(String.raw`
  ___________
 |           |
 |   < / >   |
 |___________|
     |___|
   =========
`),
  matrix: art(String.raw`
  [ 1 0 0 0 ]
  [ 0 1 0 0 ]
  [ 0 0 1 0 ]
  [ 0 0 0 1 ]
`),
  carport: art(String.raw`
  /=========\
  [|||||||||]
    |     |
   .-|---|-.
  '-o-----o-'
`),
};

export const bootLines = [
  "JF Windows [Version 2026.09.18]",
  "(c) Jacob Foster. All rights reserved.",
  " ",
  "C:\\Users\\Jacob>portfolio.exe",
  "Loading experience.dll ....... OK",
  "Loading projects.dll ......... OK",
  "Starting cmd.exe ............. OK",
];
