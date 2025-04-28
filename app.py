# app.py
from flask import Flask, request, jsonify, render_template
from algoritmo import hill_climbing, evalua_ruta

app = Flask(__name__, template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/resolver', methods=['POST'])
def resolver():
    data = request.get_json()
    coord = { ciudad['nombre']: (ciudad['latitud'], ciudad['longitud']) for ciudad in data['ciudades'] }
    ruta = hill_climbing(coord)
    distancia_total = evalua_ruta(ruta, coord)
    return jsonify({
        'ruta': ruta,
        'distancia_total': distancia_total
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)

