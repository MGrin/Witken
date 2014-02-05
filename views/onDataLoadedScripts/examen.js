var events = §§-JSON.stringify(events);§;

var onDataLoaded = function () {
    $('#locations').html('');
    $('#dates').html('');
    $('#times').html('');

    if (locationSelected) {
        locationSelected = null;
        dateSelected = null;
        timeSelected = null;
        hideBtn();
    }
    constructLocations();
    constructDates();
    constructTimes();

    setupWitkenCircleControls();
};

var locationSelected;
var dateSelected;
var timeSelected;

var constructLocations = function () {
    $('#locations').html('');
    for (var i = 0; i < events.length; i++) {
        var venue = events[i].venue.city + ", " + events[i].venue.country;
        var id = events[i].venue.id;
        if (hasPlace(events[i])) {
            addLocation(venue, id);
        }
    };
    $('.location').click(function () {
        selectLocation($(this));
    });
}

var selectLocation = function (loc) {
    $('.location').each(function () {
        $(this).removeClass('active');
        $(this).css('background-color', 'rgb(48,49,53)');
    });
    loc.addClass('active');
    loc.css('background-color', 'rgb(91, 151, 40)');

    locationSelected = loc.children().text();
    dateSelected = null;
    constructDates();
}

var constructDates = function () {
    if (locationSelected) {
        $('#dates').html(generateSelectorCircleWithId('datesCircle'));
        for (var i = 0; i < events.length; i++) {
            var d = new Date(events[i].start_date);
            var startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            var location = events[i].venue.city + ", " + events[i].venue.country;
            if (locationSelected === location && hasPlace(events[i])) {
                addDate(startDate);
                if (!dateSelected) {
                    dateSelected = startDate;
                }
            }
        };
        setupWitkenCircleControls();
        constructTimes();
    } else {
        hideDates();
        hideTimes();
        hideBtn();
    }
}

var constructTimes = function () {
    if (locationSelected && dateSelected) {
        $('#times').html('');
        timeElementSelected = null;
        timeSelected = null;
        $('#button_div').html('');
        for (var i = 0; i < events.length; i++) {
            var d = new Date(events[i].start_date);
            var startTime = d.getHours() < 12 ? "Morning" : "Afternoon";
            var startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            var location = events[i].venue.city + ", " + events[i].venue.country;
            if (dateSelected === startDate && locationSelected === location && hasPlace(events[i])) {
                addTime(startTime);
            }
        };
        setupWitkenCircleControls();
        $('.time').click(function () {
            selectTime($(this));
        });
    } else {
        hideTimes();
        hideBtn();
    }
}

var selectTime = function (time) {
    $('.time').each(function () {
        $(this).removeClass('active');
        $(this).css('background-color', 'rgb(48,49,53)');
    });
    time.addClass('active');
    time.css('background-color', 'rgb(91, 151, 40)');

    timeSelected = time.children().text();
    $('#button_div').html('<button type="button" class="btn btn-default" id="proceed-btn">Proceed</button>');
    $('#proceed-btn').click(function () {
        var event = getChoosenEvent();
        if (!event) {
            alert('Error!');
        } else {
            window.location.href = event.url;
        }
    });
}

var hasPlace = function (event) {
    var available = 0;
    for (var i = 0; i < event.tickets.length; i++) {
        var ticket = event.tickets[i];
        available += parseInt(ticket.quantity_available) - parseInt(ticket.quantity_sold);
    }
    return available != 0;
}

var getChoosenEvent = function () {
    for (var i = 0; i < events.length; i++) {
        var d = new Date(events[i].start_date);
        var startTime = d.getHours() < 12 ? "Morning" : "Afternoon";
        var startDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var location = events[i].venue.city + ", " + events[i].venue.country;

        if (startTime === timeSelected && startDate === dateSelected && location === locationSelected) {
            return events[i];
        }
    }

    return undefined;
}

var addLocation = function (venue, id) {
    $('#locations').html($('#locations').html() + generateTextCircle(venue, 'location'));
}

var addDate = function (startDate) {
    $('#datesCircle').html($('#datesCircle').html() + '<option>' + startDate + '</option>');
}

var addTime = function (startTime) {
    $('#times').html($('#times').html() + generateTextCircle(startTime, 'time'));
}

var hideDates = function () {
    $('#dates').html('');
    dateSelected = null;
}

var hideTimes = function () {
    $('#times').html('');
    timeSelected = null;
}

var hideBtn = function () {
    $('#proceed-btn').addClass('hide');
}