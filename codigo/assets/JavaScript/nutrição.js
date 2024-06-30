function calculateBMI() {
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value);
    
    var bmi = weight / (height * height);

    var resultElement = document.getElementById('result');
    var recipesElement = document.getElementById('recipes');

    resultElement.innerHTML = 'Seu IMC é: ' + bmi.toFixed(2);

    var recipes = getRecipesByBMI(bmi);
    recipesElement.innerHTML = '';
    recipes.forEach(function(recipe) {
        var recipeHTML = '<h3>' + recipe.titulo + '</h3><ul>';
        recipe.ingredientes.forEach(function(ingrediente) {
            recipeHTML += '<li>' + ingrediente + '</li>';
        });
        recipeHTML += '</ul>';
        recipesElement.innerHTML += recipeHTML;
    });
}

function getRecipesByBMI(bmi) {
    var recipes = [];

    if (bmi < 18.5) {
        recipes = [
            {
                titulo: "Salada de quinoa com legumes",
                ingredientes: ["Quinoa", "Tomate", "Pepino", "Pimentão", "Azeite", "Limão", "Sal"]
            },
            {
                titulo: "Sopa de legumes",
                ingredientes: ["Cenoura", "Batata", "Abobrinha", "Cebola", "Alho", "Caldo de legumes"]
            }
        ];
    } else if (bmi >= 18.5 && bmi < 25) {
        recipes = [
            {
                titulo: "Frango grelhado com legumes",
                ingredientes: ["Peito de frango", "Brócolis", "Cenoura", "Pimentão", "Azeite", "Sal", "Pimenta"]
            },
            {
                titulo: "Salada de atum com grão de bico",
                ingredientes: ["Atum em lata", "Grão de bico", "Tomate cereja", "Cebola roxa", "Azeite", "Vinagre balsâmico", "Sal"]
            }
        ];
    } else if (bmi >= 25 && bmi < 30) {
        recipes = [
            {
                titulo: "Wrap de frango com vegetais",
                ingredientes: ["Tortilha integral", "Peito de frango grelhado", "Alface", "Tomate", "Cenoura ralada", "Iogurte natural", "Mostarda"]
            },
            {
                titulo: "Omelete de legumes",
                ingredientes: ["Ovos", "Pimentão", "Cebola", "Tomate", "Espinafre", "Queijo cottage", "Sal"]
            }
        ];
    } else if (bmi >= 30 && bmi < 35) {
        recipes = [
            {
                titulo: "Peixe assado com batata-doce",
                ingredientes: ["Filé de peixe branco", "Batata-doce", "Brócolis", "Azeite", "Alho", "Sal", "Pimenta"]
            },
            {
                titulo: "Salada de grãos com abacate",
                ingredientes: ["Quinoa", "Feijão preto", "Milho", "Abacate", "Tomate", "Coentro", "Limão", "Sal"]
            }
        ];
    } else {
        recipes = [
            {
                titulo: "Sopa de lentilha com legumes",
                ingredientes: ["Lentilha", "Cenoura", "Aipo", "Cebola", "Alho", "Tomate", "Caldo de vegetais", "Sal", "Pimenta"]
            },
            {
                titulo: "Tigela de arroz integral com legumes",
                ingredientes: ["Arroz integral", "Brócolis", "Cenoura", "Pimentão", "Ervilha", "Amêndoas", "Azeite", "Sal"]
            }
        ];
    }

    return recipes;
}
