import os
import sys
import msvcrt
import time
import random
import threading
import socketio
import requests
import logging
import queue
import json
import re
from urllib.parse import urlparse

logging.getLogger('engineio').setLevel(logging.WARNING)
logging.getLogger('socketio').setLevel(logging.WARNING)

class _Getch:
    def __init__(self):
        if os.name == 'nt':
            self.impl = self._windows_getch
        else:
            self.impl = self._unix_getch

    def _windows_getch(self):
        return msvcrt.getch().decode('utf-8', 'ignore')
    
    def _unix_getch(self):
        import tty, termios
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        try:
            tty.setraw(fd)
            ch = sys.stdin.read(1)
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
        return ch

    def __call__(self):
        return self.impl()

getch = _Getch()

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

LOGO_ART = r"""
$$$$$$$$\                                                                            
\__$$  __|                                                                           
   $$ |$$\  $$\  $$\  $$$$$$\  $$$$$$\$$$$\   $$$$$$\  $$\   $$\ $$$$$$$\   $$$$$$\  
   $$ |$$ | $$ | $$ |$$  __$$\ $$  _$$  _$$\ $$  __$$\ $$ |  $$ |$$  __$$\ $$  __$$\ 
   $$ |$$ | $$ | $$ |$$ /  $$ |$$ / $$ / $$ |$$ /  $$ |$$ |  $$ |$$ |  $$ |$$$$$$$$ |
   $$ |$$ | $$ | $$ |$$ |  $$ |$$ | $$ | $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|
   $$ |\$$$$$\$$$$  |\$$$$$$  |$$ | $$ | $$ |$$$$$$$  |\$$$$$$  |$$ |  $$ |\$$$$$$$\ 
   \__| \_____\____/  \______/ \__| \__| \__|$$  ____/  \______/ \__|  \__| \_______|
                                             $$ |                                    
                                             $$ |                                    
                                             \__|                                    
"""

FULL_LOGO = LOGO_ART + "\n            VERSION 1.0 EARLY ACCESS\n                                        created by jim megatron and Twompman"

COLORS = ["red", "brown", "green", "blue", "purple", "black", "cyan", "yellow", "pink", "white"]
HATS = ["none", "bucket", "pot", "chain", "troll", "wizard", "kamala", "maga", "evil", 
        "bfdi", "elon", "tophat", "witch", "horse", "bieber", "obama", "bowtie"]

class BotConfig:
    def __init__(self):
        self.name = "Anonymous"
        self.color = ""
        self.hat = "none"
        self.text = "Hello from ThwompBot!"
        self.room_id = "default"
        self.bot_count = 1
        self.running = False
        self.threads = []
        self.proxies = queue.Queue()
        self.connection_delay = 1.5
        self.max_retries = 3

bot_config = BotConfig()

def display_main_menu(selected):
    clear_screen()
    print(FULL_LOGO)
    print("\n")
    
    options = ["START", "OPTIONS", "QUIT"]
    for idx, option in enumerate(options):
        prefix = "                      >   " if idx == selected else "                          "
        print(f"{prefix}{option}")

def display_name_screen(name_input):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                          > TYPE THWOMPBOT NAME:")
    print("\n")
    print(f"                          {name_input}{'_' if time.time() % 1 > 0.5 else ' '}")
    print("\n" * 5)

def display_color_screen(color_input):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                          > TYPE COLOR (leave blank for random):")
    print("\n")
    print(f"                          {color_input}{'_' if time.time() % 1 > 0.5 else ' '}")
    print("\n" * 5)
    print("                          Available colors: red, brown, green, blue, purple,")
    print("                          black, cyan, yellow, pink, white")

def display_hat_screen(hat_input):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                          > TYPE HAT (optional, leave blank for none):")
    print("\n")
    print(f"                          {hat_input}{'_' if time.time() % 1 > 0.5 else ' '}")
    print("\n" * 5)
    print("                          Available hats: none, bucket, pot, chain, troll,")
    print("                          wizard, kamala, maga, evil, bfdi, elon, tophat,")
    print("                          witch, horse, bieber, obama, bowtie")

def display_text_screen(text_input):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                          > TYPE TEXT (required, max 2500 chars):")
    print("\n")
    display_text = text_input[-50:] if len(text_input) > 50 else text_input
    print(f"                          {display_text}{'_' if time.time() % 1 > 0.5 else ' '}")
    if len(text_input) > 50:
        print(f"                          ... (truncated, {len(text_input)} chars total)")
    print("\n" * 3)

def display_templates_screen(selected):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("            VERSION 1.0\n                                        created by jim megatron and Twompman")
    print("\n" * 2)
    print("                          > BACK")
    print("\n" * 3)
    print("                       (NO TEMPLATES, COMING SOON)")

def display_room_menu(selected):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                         ")
    options = ["GO TO DEFAULT ROOM", "CHOOSE ROOM ID"]
    for idx, option in enumerate(options):
        prefix = "                          > " if idx == selected else "                             "
        print(f"{prefix}{option}")

def display_room_id_screen(room_id_input):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                          > TYPE ROOM ID (leave blank for default):")
    print("\n")
    print(f"                          {room_id_input}{'_' if time.time() % 1 > 0.5 else ' '}")
    print("\n" * 5)
    print("                          Example: YOUR_ROOM_ID")

def display_bot_count_screen(count_input):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                          CHOOSE HOW MANY BOTS:")
    print("\n")
    print(f"                             > {count_input}")
    print("\n" * 2)
    print("                (i) 1 IS MINIMUM, 3 IS MAXIMUM, INCREASEMENT SOON. EARLY ACCESS VERSION")

def display_starting_screen(selected):
    clear_screen()
    print(LOGO_ART)
    print("\n")
    print("                                THWOMPUNE HAS STARTED")
    print(f"                                  AT ROOM ID: {bot_config.room_id}")
    print(f"                                 USING {bot_config.proxies.qsize()} PROXIES")
    print("\n" * 2)
    print("                             > STOP SESSION")

def get_text_input(prompt, max_length=2500):
    input_buffer = ""
    if prompt == "name":
        display_name_screen(input_buffer)
    elif prompt == "color":
        display_color_screen(input_buffer)
    elif prompt == "hat":
        display_hat_screen(input_buffer)
    elif prompt == "text":
        display_text_screen(input_buffer)
    elif prompt == "count":
        display_bot_count_screen(input_buffer)
    elif prompt == "room_id":
        display_room_id_screen(input_buffer)
    
    while True:
        key = getch()
        
        if key == '\x1b':
            return None
        elif key in ('\r', '\n'):
            return input_buffer
        elif key in ('\x08', '\x7f'):
            input_buffer = input_buffer[:-1]
        elif len(input_buffer) < max_length and key.isprintable():
            input_buffer += key
        
        if prompt == "name":
            display_name_screen(input_buffer)
        elif prompt == "color":
            display_color_screen(input_buffer)
        elif prompt == "hat":
            display_hat_screen(input_buffer)
        elif prompt == "text":
            display_text_screen(input_buffer)
        elif prompt == "count":
            display_bot_count_screen(input_buffer)
        elif prompt == "room_id":
            display_room_id_screen(input_buffer)

def load_proxies():
    if not os.path.exists("proxies.txt"):
        print("No proxies.txt found. Bots will use direct connections.")
        return
    
    with open("proxies.txt", "r") as f:
        proxies = [line.strip() for line in f if line.strip()]
        
        proxies = list(dict.fromkeys(proxies))
        
        valid_proxies = []
        for proxy in proxies:
            if re.match(r'^(\w+):\/\/[\w\.-]+:\d+$', proxy):
                valid_proxies.append(proxy)
            else:
                print(f"Invalid proxy format skipped: {proxy}")
        
        for proxy in valid_proxies:
            for _ in range(3):
                bot_config.proxies.put(proxy)
                
        print(f"Loaded {bot_config.proxies.qsize()} proxy slots from {len(valid_proxies)} proxies")

def get_proxy():
    if not bot_config.proxies.empty():
        return bot_config.proxies.get()
    return None

def get_socketio_url():
    return "https://bonzi.gay/socket.io/"

def bot_thread(bot_id):
    sio = socketio.Client(reconnection_attempts=bot_config.max_retries)
    color = bot_config.color or random.choice(COLORS)
    hat = bot_config.hat
    proxy = get_proxy()
    
    room_id = bot_config.room_id

    try:
        socketio_url = get_socketio_url()
        print(f"Bot {bot_id}: Connecting to {socketio_url}")
        
        proxy_options = {}
        if proxy:
            print(f"Bot {bot_id}: Using proxy: {proxy}")
            parsed_proxy = urlparse(proxy)
            proxy_options = {
                'proxy_host': parsed_proxy.hostname,
                'proxy_port': parsed_proxy.port
            }
            if parsed_proxy.username and parsed_proxy.password:
                proxy_options['proxy_auth'] = (parsed_proxy.username, parsed_proxy.password)
            
            sio.eio.http_session.proxies.update({'http': proxy, 'https': proxy})
            sio.eio.websocket_options.update(proxy_options)
        
        login_delay = random.uniform(1.0, 7.0)
        print(f"Bot {bot_id}: Waiting {login_delay:.2f} seconds before connecting")
        time.sleep(login_delay)
        
        sio.connect(
            socketio_url, 
            transports=['websocket'],
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        print(f"Bot {bot_id}: Connected successfully")
        
        sio.emit("login", {
            "name": bot_config.name,
            "room": room_id
        })
        print(f"Bot {bot_id}: Login sent for room '{room_id}'")
        
        time.sleep(2 + random.random())
        
        sio.emit("command", {"list": ["name", bot_config.name]})
        sio.emit("command", {"list": ["color", color]})
        sio.emit("command", {"list": ["hat", hat]})
        print(f"Bot {bot_id}: Configuration commands sent")
        
        spam_count = 0
        while bot_config.running:
            try:
                sio.emit("talk", {"text": bot_config.text})
                spam_count += 1
                print(f"Bot {bot_id}: Message sent ({spam_count})")
                time.sleep(1.032)
            except Exception as e:
                print(f"Bot {bot_id} messaging error: {e}")
                try:
                    sio.disconnect()
                    print(f"Bot {bot_id}: Attempting reconnect...")
                    sio.connect(
                        socketio_url, 
                        transports=['websocket'],
                        headers={
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                        }
                    )
                    print(f"Bot {bot_id}: Reconnected successfully")
                except Exception as reconnect_err:
                    print(f"Bot {bot_id} reconnect failed: {reconnect_err}")
                    break
            
    except Exception as e:
        print(f"Bot {bot_id} connection error: {e}")
    finally:
        if proxy:
            bot_config.proxies.put(proxy)
        try:
            if sio.connected:
                sio.disconnect()
                print(f"Bot {bot_id}: Disconnected")
        except:
            pass

def start_bots():
    bot_config.running = True
    for i in range(bot_config.bot_count):
        thread = threading.Thread(target=bot_thread, args=(i+1,))
        thread.daemon = True
        thread.start()
        bot_config.threads.append(thread)
        
        time.sleep(bot_config.connection_delay)

def stop_bots():
    bot_config.running = False
    for thread in bot_config.threads:
        thread.join(timeout=1.0)
    bot_config.threads = []

def main():
    current_state = "MAIN_MENU"
    selected_option = 0
    bot_count_input = "1"
    
    load_proxies()
    
    try:
        while True:
            if current_state == "MAIN_MENU":
                display_main_menu(selected_option)
                key = getch()
                
                if key == '\xe0' and os.name == 'nt':
                    key = getch()
                
                if key in ('A', 'H'):
                    selected_option = (selected_option - 1) % 3
                elif key in ('B', 'P'):
                    selected_option = (selected_option + 1) % 3
                elif key in ('\r', '\n'):
                    if selected_option == 0:
                        current_state = "NAME_INPUT"
                    elif selected_option == 1:
                        current_state = "TEMPLATES"
                    elif selected_option == 2:
                        return
                elif key == 'q':
                    return
            
            elif current_state == "NAME_INPUT":
                name = get_text_input("name")
                if name is None:
                    current_state = "MAIN_MENU"
                else:
                    bot_config.name = name or "Anonymous"
                    current_state = "COLOR_INPUT"
            
            elif current_state == "COLOR_INPUT":
                color = get_text_input("color")
                if color is None:
                    current_state = "NAME_INPUT"
                else:
                    bot_config.color = color
                    current_state = "HAT_INPUT"
            
            elif current_state == "HAT_INPUT":
                hat = get_text_input("hat")
                if hat is None:
                    current_state = "COLOR_INPUT"
                else:
                    bot_config.hat = hat if hat in HATS else "none"
                    current_state = "TEXT_INPUT"
            
            elif current_state == "TEXT_INPUT":
                while True:
                    text = get_text_input("text", 2500)
                    if text is None:
                        current_state = "HAT_INPUT"
                        break
                    elif text.strip() == "":
                        display_text_screen("")
                        continue
                    else:
                        bot_config.text = text
                        current_state = "ROOM_SELECTION"
                        selected_option = 0
                        break
            
            elif current_state == "TEMPLATES":
                display_templates_screen(0)
                key = getch()
                if key in ('\r', '\n', '\x1b'):
                    current_state = "MAIN_MENU"
            
            elif current_state == "ROOM_SELECTION":
                display_room_menu(selected_option)
                key = getch()
                
                if key == '\xe0' and os.name == 'nt':
                    key = getch()
                
                if key in ('A', 'H'):
                    selected_option = (selected_option - 1) % 2
                elif key in ('B', 'P'):
                    selected_option = (selected_option + 1) % 2
                elif key in ('\r', '\n'):
                    if selected_option == 0:
                        bot_config.room_id = "default"
                        current_state = "BOT_COUNT"
                    elif selected_option == 1:
                        current_state = "ROOM_ID_INPUT"
                elif key == '\x1b':
                    current_state = "TEXT_INPUT"
            
            elif current_state == "ROOM_ID_INPUT":
                room_id = get_text_input("room_id", 30)
                if room_id is None:
                    current_state = "ROOM_SELECTION"
                else:
                    if room_id.strip():
                        bot_config.room_id = room_id.strip()
                    else:
                        bot_config.room_id = "default"
                    current_state = "BOT_COUNT"
            
            elif current_state == "BOT_COUNT":
                count_str = get_text_input("count", 3)
                if count_str is None:
                    current_state = "ROOM_SELECTION"
                else:
                    try:
                        count = max(1, min(3, int(count_str or "1"))) # count the bots
                        bot_config.bot_count = count
                        current_state = "STARTING"
                        start_bots()
                    except ValueError:
                        bot_count_input = "1"
            
            elif current_state == "STARTING":
                display_starting_screen(0)
                key = getch()
                if key in ('\r', '\n'):
                    stop_bots()
                    current_state = "MAIN_MENU"
    
    except KeyboardInterrupt:
        print("\nProgram terminated")
        stop_bots()

if __name__ == "__main__":
    try:
        import socketio
        import requests
        import websocket
    except ImportError:
        print("Installing required packages...")
        os.system("pip install python-socketio requests websocket-client")
        import socketio
        import requests
    
    main()