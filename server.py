from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class NoCacheHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        if self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
        super().end_headers()

def run_server(port=5000):
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, NoCacheHTTPRequestHandler)
    print(f"Server running on http://0.0.0.0:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
