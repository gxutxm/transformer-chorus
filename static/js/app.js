jQuery(document).ready(function () {
    // Theme Toggle
    const themeToggle = $('#theme-toggle');
    const html = $('html');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.attr('data-theme', savedTheme);
    
    themeToggle.on('click', function() {
        const currentTheme = html.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Slider
    var slider = $('#max_words');
    slider.on('change mousemove', function (evt) {
        $('#label_max_words').text(slider.val() + ' predictions');
    });

    // Toggle details section
    $('#btn-show-details').on('click', function() {
        $('#details-section').toggleClass('show');
        $(this).toggleClass('active');
        
        if ($(this).hasClass('active')) {
            $(this).find('span').text('♫ Hide the voices');
        } else {
            $(this).find('span').text('♫ See how each voice voted');
        }
    });

    // Prediction on spacebar
    $('#input_text').on('keyup', function (e) {
        if (e.key == ' ') {
            $.ajax({
                url: '/get_end_predictions',
                type: "post",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify({
                    "input_text": $('#input_text').val(),
                    "top_k": slider.val(),
                }),
                beforeSend: function () {
                    $('.overlay').css('display', 'flex');
                },
                complete: function () {
                    $('.overlay').hide();
                }
            }).done(function (jsondata, textStatus, jqXHR) {
                console.log(jsondata);
                
                // Show chorus section with animation
                $('#chorus-section').addClass('visible');
                
                // Render results
                renderChorus(jsondata.council);
                renderScoringTable(jsondata.council);
                renderModelPredictions(jsondata.individual);
                
                // Show details button
                $('#btn-show-details').css('display', 'flex');
                
            }).fail(function (jsondata, textStatus, jqXHR) {
                console.log("Error:", jsondata);
            });
        }
    });
});

// Render the main chorus decision
function renderChorus(chorusData) {
    var container = $('#chorus-results');
    container.empty();
    
    if (!chorusData || chorusData.length === 0) {
        container.html('<p class="placeholder">No harmony found</p>');
        return;
    }
    
    chorusData.forEach(function(item, index) {
        var agreementClass = '';
        if (item.agreement >= 5) agreementClass = 'agreement-high';
        else if (item.agreement >= 3) agreementClass = 'agreement-medium';
        else agreementClass = 'agreement-low';
        
        var topPickClass = index === 0 ? 'top-pick' : '';
        
        var itemHtml = `
            <div class="chorus-item ${topPickClass}" style="animation-delay: ${index * 0.1}s">
                <div class="chorus-word">${item.word}</div>
                <div class="chorus-meta">
                    <div class="chorus-score">${item.score} points</div>
                    <div class="chorus-agreement ${agreementClass}">${item.agreement}/6 voices</div>
                </div>
            </div>
        `;
        container.append(itemHtml);
    });
}

// Render the scoring breakdown table
function renderScoringTable(chorusData) {
    var tbody = $('#scoring-tbody');
    tbody.empty();
    
    if (!chorusData) return;
    
    chorusData.forEach(function(item) {
        var modelBadges = item.models.map(function(m) {
            return `<span class="model-badge">${m}</span>`;
        }).join('');
        
        var row = `
            <tr>
                <td class="word-cell">${item.word}</td>
                <td class="score-cell">${item.score}</td>
                <td>${modelBadges}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Render individual model predictions with rankings
function renderModelPredictions(individual) {
    var models = ['bert', 'xlnet', 'xlm', 'bart', 'electra', 'roberta'];
    
    models.forEach(function(model) {
        var container = $(`#pred-${model}`);
        container.empty();
        
        if (!individual[model]) return;
        
        var words = individual[model].split('\n');
        words.forEach(function(word, index) {
            if (word.trim()) {
                var html = `<div><span class="rank">${String(index + 1).padStart(2, '0')}</span>${word}</div>`;
                container.append(html);
            }
        });
    });
}