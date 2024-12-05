import safetensors.torch
import sys
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import safetensors.torch

def load_model():
    try:
        model_path = './models/model.safetensors'  # Path to your model file
        model_name = 'gpt2'  # Using GPT-2 model from Hugging Face
        
        # Load the tokenizer
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        
        # Load the model weights from the .safetensors file
        model = AutoModelForCausalLM.from_pretrained(
            model_name, 
            state_dict=safetensors.torch.load_file(model_path)
        )
        
        return tokenizer, model
    except Exception as e:
        print(f"Error loading model: {e}")
        sys.exit(1)

def generate_response(user_input):
    tokenizer, model = load_model()
    
    # Encode the user input
    inputs = tokenizer.encode(user_input, return_tensors='pt')
    
    # Generate a response with a limit on repetition
    outputs = model.generate(
        inputs, 
        max_length=30,  # You can adjust this to a longer length if needed
        num_return_sequences=1,
        no_repeat_ngram_size=2,  # Prevent n-grams repetition (like pairs of words)
        early_stopping=True
    )
    
    # Decode the output and remove the user's input from the response if it appears
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    # Remove the user input from the response if it is included
    if response.lower().startswith(user_input.lower()):
        response = response[len(user_input):].strip()

    # Clean up any extra spaces or unwanted characters
    response = response.replace("\r\n", " ").replace("\n", " ").strip()
    
    return response

if __name__ == "__main__":
    user_input = sys.argv[1]
    response = generate_response(user_input)
    print(response)
