package cityfarm.api.calendar;

import cityfarm.api.animals.AnimalGeneric;
import cityfarm.api.enclosure.Enclosure;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Set;

@Component
public class EventRepositoryCustom {
        private final MongoOperations mongoOperations;

        public EventRepositoryCustom(MongoOperations mongoOperations) {
            this.mongoOperations = mongoOperations;
        }

        public long findAfter(ZonedDateTime after) {
            Query query = new Query(Criteria.where("").is(id));
            Update update = new Update().set("holding", holding);
            return mongoOperations.updateFirst(query, update, Enclosure.class).getModifiedCount();
        }

        public long updateCapacities(String id, HashMap<String, Integer> capacities) {
            Query query = new Query(Criteria.where("_id").is(id));
            Update update = new Update().set("capacities", capacities);
            return mongoOperations.updateFirst(query, update, Enclosure.class).getModifiedCount();
        }
}
