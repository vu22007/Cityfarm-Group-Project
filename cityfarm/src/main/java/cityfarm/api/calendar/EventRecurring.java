package cityfarm.api.calendar;


import cityfarm.api.animals.AnimalUnique;
import cityfarm.api.enclosure.Enclosure;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mongodb.lang.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.lang.Nullable;

import java.time.*;
import java.util.*;

public class EventRecurring extends Event {
    private final ZonedDateTime firstEnd;

    private final Duration delay;

    @Id
    private final String id;

    @Override
    public String get_id() {
        return id;
    }

    @Override
    public List<EventInstance> nextOccurences(@Nullable ZonedDateTime from, @Nullable Integer num) {
        List<EventInstance> events = new ArrayList<>();

        from = Objects.requireNonNullElse(from, start);
        ZonedDateTime currentDatetime = start;

        Duration delta = Duration.between(start, firstEnd);

        while (currentDatetime.isBefore(from)) {
            currentDatetime = currentDatetime.plus(delay);
        }

        for (int i = 0; i < Objects.requireNonNullElse(num, 1); i++) {
            EventInstance event = new EventInstance(currentDatetime, currentDatetime.plus(delta), this);
            events.add(event);
            currentDatetime = currentDatetime.plus(delay);
        }

        return events;
    }

    @Override
    public List<EventInstance> occurencesBetween(@Nullable ZonedDateTime from, @Nullable ZonedDateTime to) {
        return null;
    }

    public EventRecurring(@NonNull ZonedDateTime firstStart,  @NonNull ZonedDateTime firstEnd, @NonNull Duration delay, ZonedDateTime finalEnd, @Nullable String id) {
        this.start = firstStart;
        this.firstEnd = firstEnd;
        this.end = Objects.requireNonNullElse(finalEnd, ZonedDateTime.parse("292278994-08-17T07:12:55.805Z"));
        this.delay = delay;
        this.id = Objects.requireNonNullElseGet(id, () -> UUID.randomUUID().toString());
    }

    @JsonCreator
    @PersistenceCreator
    public EventRecurring(@JsonProperty("first_start") @NonNull ZonedDateTime firstStart, @JsonProperty("first_end") @Nullable ZonedDateTime firstEnd, @JsonProperty("all_day") @NonNull Boolean all_day,
                          @JsonProperty("title") @NonNull String title, @JsonProperty("description") @Nullable String description,
                          @JsonProperty("enclosures") @Nullable List<Enclosure> attachedEnclosures, @JsonProperty("animals") @Nullable List<AnimalUnique> attachedAnimals, @JsonProperty("people") @Nullable List<Person> attachedPeople,
                          @JsonProperty("final_end") @Nullable ZonedDateTime finalEnd, @JsonProperty("delay") @NonNull Duration delay, @JsonProperty("_id") @Nullable String id) {
        if (end == null && !all_day) {
            throw new IllegalArgumentException("If end isn't present, the event must be marked as all day");
        }

        this.start = firstStart;
        this.firstEnd = firstEnd;
        this.end = Objects.requireNonNullElse(finalEnd, ZonedDateTime.parse("292278994-08-17T07:12:55.805Z"));
        this.delay = delay;
        this.id = Objects.requireNonNullElseGet(id, () -> UUID.randomUUID().toString());
        this.all_day = all_day;
        this.title = title;
        this.description = description;
        this.attachedEnclosures = attachedEnclosures;
        this.attachedAnimals = attachedAnimals;
        this.attachedPeople = attachedPeople;
    }
}
