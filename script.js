class Script {
  /**
   * @params {object} request
   */
  process_incoming_request ({ request }) {
    if (!Array.isArray(request.content))
      return;

    var attachments = request.content.map((obj, idx) => {
      if (!obj.check || !obj.downtime)
        return;

      var status = obj.check.down ? "Down" : "Up";
      var site = obj.check.alias || obj.check.url;
      var emoji_list = obj.check.down ? down_emojis : up_emojis;
      var emoji = emoji_list[Math.floor(Math.random() * emoji_list.length)];

      var text = emoji + " " + status + " since ";

      if (obj.check.down) {
        text += bold(extract_time(obj.downtime.started_at))
      } else {
        text += bold(extract_time(obj.downtime.ended_at));

        var delta = humanize_delta(obj.downtime.started_at, obj.downtime.ended_at);
        text += ', afer ' + bold(delta) + ' of downtime';
      }

      if (obj.downtime.error) {
        text += ', reason: ' + bold(obj.downtime.error);
      }

      return {
        title: site,
        title_link: "https://updown.io/checks",
        color: obj.check.down ? "red" : "green",
        text: text
      }

    });

    attachments = attachments.filter(att => !!att);

    return {
      content:{
        text: "Updown.io update",
        attachments: attachments
      }
    }
  }
}

const up_emojis = [':relieved:', ':sunny:', ':tada:']
const down_emojis = [':boom:', ':skull:', ':fire:']

function bold (str){
  return '*' + str + '*';
}

function extract_time (isodate) {
  if (!isodate)
    return "";
  return isodate.match(/T([0-9:]+)Z/)[1]
}

function humanize_delta (from_str, to_str) {
  var diff = new Date(to_str) - new Date(from_str);
  var str = "";

  var hours = Math.round(diff / 3600000);
  if (hours > 0) {
    str = hours + " hours";
    diff = diff % 3600000;
  }

  var minutes = Math.round(diff / 60000);
  if (minutes > 0) {
    str += (hours > 0 ? " and " : "") + minutes + " minutes";
  }

  return str;
}
