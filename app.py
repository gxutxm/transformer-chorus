from flask import Flask, request, render_template, jsonify
import main

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_end_predictions', methods=['POST'])
def get_prediction_eos():
    """Predict the next word (mask at end)"""
    try:
        input_text = ' '.join(request.json['input_text'].split())
        input_text += ' <mask>'
        top_k = int(request.json.get('top_k', 5))
        
        result = main.predict_with_council(input_text, top_clean=top_k)
        
        return jsonify({
            'success': True,
            'input': input_text,
            'individual': result['individual'],
            'council': result['council']
        })
    except Exception as error:
        print(f"Error: {error}")
        return jsonify({'success': False, 'error': str(error)}), 500


@app.route('/get_mask_predictions', methods=['POST'])
def get_prediction_mask():
    """Predict the masked word (mask anywhere in sentence)"""
    try:
        input_text = ' '.join(request.json['input_text'].split())
        top_k = int(request.json.get('top_k', 5))
        
        result = main.predict_with_council(input_text, top_clean=top_k)
        
        return jsonify({
            'success': True,
            'input': input_text,
            'individual': result['individual'],
            'council': result['council']
        })
    except Exception as error:
        print(f"Error: {error}")
        return jsonify({'success': False, 'error': str(error)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8000, use_reloader=False)