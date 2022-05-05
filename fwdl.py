#!/usr/bin/python3 -u

import json
import sys
import struct
import subprocess
import time

logfile='/tmp/fwdl.log'

raw_length = sys.stdin.buffer.read(4)
if not raw_length:
    sys.exit(0)
msg_length = struct.unpack('=I', raw_length)[0]
msg = sys.stdin.buffer.read(msg_length).decode("utf-8")
msg = json.loads(msg)

subprocess.run(['notify-send', '-t', '5000', 'Firefox Download 1'])

url = msg['url']
fpath = msg['filename']
executablePath = msg['executablePath']
arguments = msg['arguments']
minSize = msg['minSize']
with open("/home/tubbadu/log.txt", "w") as f:
    f.write(str(arguments))
subprocess.run(['notify-send', '-t', '5000', 'Firefox Download 2', arguments])

#replace '[URL]' and '[FILENAME]' in arguments
arguments.replace('[URL]', url).replace('[FILENAME]', fpath)
subprocess.run(['notify-send', '-t', '5000', 'Firefox Download 3'])

#do something with your file
subprocess.run(['notify-send', '-t', '5000', 'Firefox Download requested', executablePath])

subprocess.run([executablePath, arguments.strip().split()])


with open(logfile,'a') as f:
    f.write(fpath+ "\n"+
            url+ "\n"
    )

# add extended attributes to the downloaded file
subprocess.run(['attr','-s','dl_url', '-V', url, fpath ])
subprocess.run(['attr','-s','dl_file', '-V', fpath.split('/')[-1], fpath ])
subprocess.run(['attr','-s','dl_time', '-V', str(int(time.time())), fpath ])

# show a system message notification but first add some linebreaks to the url for notify-send
max_char_per_line = 50
lb_url = '\n '.join(url[i:i + max_char_per_line] for i in range(0, len(url), max_char_per_line))
subprocess.run(['notify-send', '-t', '5000', 'Firefox Download completed', lb_url ])

# create/store a copy any downloaded file
# subprocess.run(['cp', fpath, '/dl/_backup/'])
