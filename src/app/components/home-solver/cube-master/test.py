import kociemba as Cube
# from http.server import BaseHTTPRequestHandler, HTTPServer
import sys
import ast
import json


data_to_pass_back = 'Send this to javanode'

input = ast.literal_eval(sys.argv[1])
output = input
output.append(data_to_pass_back)
print(json.dumps(output))

sys.stdout.flush()

# class MyHandler(BaseHTTPRequestHandler):
#     def do_GET(self):
#         if 'Content-Length' in self.headers:
#           content_length = int(self.headers['Content-Length'])
#         else:
#           content_length = 0

#         content_length = int(self.headers['Content-Length'])
#         post_data = self.rfile.read(content_length)
#         data = json.loads(post_data.decode())
#         variable = data['variable']
#         # Procesar la variable (en este caso, convertirla a mayúsculas)
#         variable_procesada = variable.upper()

#         # Enviar la respuesta de vuelta al cliente
#         self.send_response(200)
#         self.send_header('Content-type', 'text/plain')
#         self.send_header('Access-Control-Allow-Origin', '*')  # Agregar esta línea
#         self.end_headers()
#         self.wfile.write(b'Hello, world!')

# server = HTTPServer(('localhost', 8000), MyHandler)
# server.serve_forever()
# replace the image recognition code with a function to set the state of the cube
# state   =  {
#             'up':['white','white','white','white','white','white','white','white','white',],
#             'right':['red','red','red','red','red','red','red','red','red',],
#             'front':['green','green','green','green','green','green','green','green','green',],
#             'down':['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow',],
#             'left':['orange','orange','orange','orange','orange','orange','orange','orange','orange',],
#             'back':['blue','blue','blue','blue','blue','blue','blue','blue','blue',]
#         }
# sign_conv={
#             'green'  : 'F',
#             'white'  : 'U',
#             'blue'   : 'B',
#             'red'    : 'R',
#             'orange' : 'L',
#             'yellow' : 'D'
#           }

# state_str = ''.join([sign_conv[color] for color in state['up']]) + \
#             ''.join([sign_conv[color] for color in [state['left'][1], state['front'][1], state['right'][1], state['back'][1]]]) + \
#             ''.join([sign_conv[color] for color in state['down'][::-1]])
state_str = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"
solution = Cube.solve(state_str)
print("Solution: " , {solution})